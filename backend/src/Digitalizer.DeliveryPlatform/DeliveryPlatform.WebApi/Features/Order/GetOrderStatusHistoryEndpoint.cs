using Digitalizer.DeliveryPlatform.Application.Features.Order.GetByCustomerIdOrder;
using Digitalizer.DeliveryPlatform.Application.Features.Order.GetOrderStatusHistory;
using Digitalizer.DeliveryPlatform.WebApi.EndPoints;
using Digitalizer.DeliveryPlatform.WebApi.ResultsApi;
using MediatR;

namespace Digitalizer.DeliveryPlatform.WebApi.Features.Order;

public class GetOrderStatusHistoryEndpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("/OrderStatusHistoryId", GetOrderStatusHistoryAsync)
           .WithName("GetOrderStatusHistory")
           .WithTags(Tags.Order)
           .WithOpenApi(operation =>
           {
               operation.Summary = "Get order status history by order ID";
               operation.Description = "Retrieves the order status history for a given order ID";
               return operation;
           });
    }

    private static async Task<IResult> GetOrderStatusHistoryAsync(IMediator mediator, Guid OrderId)
    {
        var query = new GetOrderStatusHistoryQuery(OrderId);
        var result = await mediator.Send(query).ConfigureAwait(false);

        return result.Match(Results.Ok, ApiResults.Problem);
    }
}
