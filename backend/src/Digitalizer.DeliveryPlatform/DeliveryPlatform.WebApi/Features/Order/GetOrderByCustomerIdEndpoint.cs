using Digitalizer.DeliveryPlatform.Application.Features.Order.GetByCustomerIdOrder;
using Digitalizer.DeliveryPlatform.WebApi.EndPoints;
using Digitalizer.DeliveryPlatform.WebApi.ResultsApi;
using MediatR;

namespace Digitalizer.DeliveryPlatform.WebApi.Features.Order;
public class GetOrderByCustomerIdEndpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("/GetOrderById", GetOrderByCustomerIdAsync)
           .WithName("GetOrderById")
           .WithTags(Tags.Order)
           .WithOpenApi(operation =>
           {
               operation.Summary = "Clear cart by customer ID";
               operation.Description = "Clears the shopping cart for a given customer ID";
               return operation;
           });
    }
    private static async Task<IResult> GetOrderByCustomerIdAsync(IMediator mediator, Guid customerId)
    {
        var query = new GetOrderByCustomerIdQuery(customerId);
        var result = await mediator.Send(query).ConfigureAwait(false);

        return result.Match(Results.Ok, ApiResults.Problem);
    }
}
