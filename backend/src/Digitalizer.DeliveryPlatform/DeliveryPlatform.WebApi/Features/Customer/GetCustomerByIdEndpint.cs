using Digitalizer.DeliveryPlatform.Application.Features.Customer.GetByIdCustomer;
using Digitalizer.DeliveryPlatform.WebApi.EndPoints;
using Digitalizer.DeliveryPlatform.WebApi.ResultsApi;
using MediatR;
using Microsoft.AspNetCore.Authorization;

namespace Digitalizer.DeliveryPlatform.WebApi.Features.Customer;

public class GetCustomerByIdEndpint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("/GetCustomerById", GetCustomerByIdAsync)
           .WithName("GetCustomerById")
           .WithTags(Tags.Customer)
           .WithOpenApi(operation =>
           {
               operation.Summary = "Get customer by ID";
               operation.Description = "Retrieves the customer details for a given customer ID";
               return operation;
           }).RequireAuthorization(new AuthorizeAttribute { Roles = "Admin" });
    }

    private static async Task<IResult> GetCustomerByIdAsync(IMediator mediator, Guid customerId)
    {
        var query = new GetCustomerByIdQuery(customerId);
        var result = await mediator.Send(query).ConfigureAwait(false);

        return result.Match(Results.Ok, ApiResults.Problem);
    }
}
