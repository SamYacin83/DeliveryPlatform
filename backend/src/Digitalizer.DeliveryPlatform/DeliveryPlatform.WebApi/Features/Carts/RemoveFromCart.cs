using Digitalizer.DeliveryPlatform.Application.Features.ShoppingCart.RemoveItemFromCart;
using Digitalizer.DeliveryPlatform.WebApi.EndPoints;
using Digitalizer.DeliveryPlatform.WebApi.ResultsApi;
using MediatR;

namespace Digitalizer.DeliveryPlatform.WebApi.Features.Carts;

public class RemoveFromCart :IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPut("carts/remove", RemoveFromCartAsync)
           .WithName("RemoveFromCart")
           .WithTags(Tags.Cart)
           .WithOpenApi(operation =>
           {
               operation.Summary = "Clear cart by customer ID";
               operation.Description = "Clears the shopping cart for a given customer ID";
               return operation;
           });
    }

    private static async Task<IResult> RemoveFromCartAsync(IMediator mediator, Request request)
    {
        var query = new RemoveItemFromCartCommand(request.CustomerId,request.ProductId);
        var result = await mediator.Send(query).ConfigureAwait(false);

        return result.Match(() => Results.Ok(), ApiResults.Problem);
    }

    internal sealed class Request
    {
        public Guid CustomerId { get; init; }
        public Guid ProductId { get; init; }
    }
}
