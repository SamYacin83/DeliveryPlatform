using Digitalizer.DeliveryPlatform.Application.Features.ShoppingCart.ClearCart;
using Digitalizer.DeliveryPlatform.WebApi.EndPoints;
using Digitalizer.DeliveryPlatform.WebApi.ResultsApi;
using MediatR;

namespace Digitalizer.DeliveryPlatform.WebApi.Features.Carts;

public class ClearCartEndpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapDelete("/carts", ClearCartAsync)
           .WithName("DeleteCart")
           .WithTags(Tags.Carts)
           .WithOpenApi(operation =>
           {
               operation.Summary = "Clear cart by customer ID";
               operation.Description = "Clears the shopping cart for a given customer ID";
               return operation;
           });
    }

    private static async Task<IResult> ClearCartAsync(IMediator mediator, Guid customerId)
    {
        var query = new ClearCartCommand(customerId);
        var result = await mediator.Send(query).ConfigureAwait(false);

        return result.Match(() => Results.Ok(), ApiResults.Problem);
    }
}
