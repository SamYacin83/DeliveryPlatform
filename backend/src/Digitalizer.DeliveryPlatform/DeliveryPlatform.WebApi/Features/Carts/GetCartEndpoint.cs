using Digitalizer.DeliveryPlatform.Application.Features.ShoppingCart.GetCart;
using Digitalizer.DeliveryPlatform.WebApi.EndPoints;
using Digitalizer.DeliveryPlatform.WebApi.ResultsApi;
using MediatR;

namespace Digitalizer.DeliveryPlatform.WebApi.Features.Carts;

public class GetCartEndpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("/carts", GetCartAsync)
           .WithName("GetCart")
           .WithTags(Tags.Carts)
           .WithOpenApi(operation =>
           {
               operation.Summary = "Get cart details by customer ID";
               operation.Description = "Returns the details of a shopping cart by the customer's ID";
               return operation;
           });
    }

    private static async Task<IResult> GetCartAsync(IMediator mediator, Guid customerId)
    {
        var query = new GetCartQuery(customerId);
        var result = await mediator.Send(query).ConfigureAwait(false);

        return result.Match(Results.Ok, ApiResults.Problem);
    }
}
