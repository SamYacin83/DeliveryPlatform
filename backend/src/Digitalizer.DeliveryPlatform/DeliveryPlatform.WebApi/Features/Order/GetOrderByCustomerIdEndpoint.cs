﻿using Digitalizer.DeliveryPlatform.Application.Features.Order.GetByCustomerIdOrder;
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
               operation.Summary = "Get order by customer ID";
               operation.Description = "Retrieves the order details for a given customer ID";
               return operation;
           }).RequireAuthorization();
    }

    private static async Task<IResult> GetOrderByCustomerIdAsync(IMediator mediator, Guid customerId)
    {
        var query = new GetOrderByCustomerIdQuery(customerId);
        var result = await mediator.Send(query).ConfigureAwait(false);

        return result.Match(Results.Ok, ApiResults.Problem);
    }
}
