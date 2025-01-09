using Digitalizer.DeliveryPlatform.Application.Features.Customer.GetCustomer;
using Digitalizer.DeliveryPlatform.WebApi.EndPoints;
using Digitalizer.DeliveryPlatform.WebApi.ResultsApi;
using MediatR;
using Microsoft.AspNetCore.Authorization;

namespace Digitalizer.DeliveryPlatform.WebApi.Features.Customer;

public class GetCustomerEndpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("/GetAllCustomer", GetAllCustomerAsync)
           .WithName("GetAllCustomerAsync")
           .WithTags(Tags.Customer)
           .WithOpenApi(operation =>
           {
               operation.Summary = "Get all customer details";
               operation.Description = "Returns the details of all customers including their information";
               return operation;
           }).RequireAuthorization(new AuthorizeAttribute { Roles = "Admin" }); 
    }

    private static async Task<IResult> GetAllCustomerAsync(IMediator mediator)
    {
        var query = new GetCustomerQuery();
        var result = await mediator.Send(query).ConfigureAwait(false);

        return result.Match(Results.Ok, ApiResults.Problem);
    }
}
