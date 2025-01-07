using Digitalizer.DeliveryPlatform.Application.Features.ShoppingCart;
using Digitalizer.DeliveryPlatform.Application.Features.ShoppingCart.AddCart;
using Digitalizer.DeliveryPlatform.WebApi.EndPoints;
using Digitalizer.DeliveryPlatform.WebApi.ResultsApi;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Digitalizer.DeliveryPlatform.WebApi.Features.Carts;

internal sealed class AddCartEndpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("/AddCart", AddCartAsync)
           .WithName("AddCart")
           .WithTags(Tags.Carts)
           .WithOpenApi(operation =>
           {
               operation.Summary = "Add a new cart";
               operation.Description = "Allows adding a new cart to the delivery platform";
               return operation;
           });
    }

    private static async Task<IResult> AddCartAsync(IMediator mediator, [FromBody] ShoppingCartDto cartDto)
    {
        var query = new AddCartCommand(cartDto.CustomerId, cartDto.ServiceType, cartDto.Items);
        var result = await mediator.Send(query).ConfigureAwait(false);

        return result.Match(Results.Ok, ApiResults.Problem);
    }
}
