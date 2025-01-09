using Digitalizer.DeliveryPlatform.Application.Features.Order.GetOrder;
using Digitalizer.DeliveryPlatform.WebApi.EndPoints;
using Digitalizer.DeliveryPlatform.WebApi.ResultsApi;
using MediatR;

namespace Digitalizer.DeliveryPlatform.WebApi.Features.Order;
internal sealed class GetOrderEndpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("/GetOrders", GetOrderAsync)
           .WithName("GetOrder")
           .WithTags(Tags.Order)
           .WithOpenApi(operation =>
           {
               operation.Summary = "Get order details";
               operation.Description = "Returns the details of an order including its items";
               return operation;
           }).RequireAuthorization();
    }

    private static async Task<IResult> GetOrderAsync(IMediator mediator)
    {
        var query = new GetOrderQuery();
        var result = await mediator.Send(query).ConfigureAwait(false);

        return result.Match(Results.Ok, ApiResults.Problem);
    }
}
