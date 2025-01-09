using Digitalizer.DeliveryPlatform.Application.Features.Customer.AddCustomer;
using Digitalizer.DeliveryPlatform.WebApi.EndPoints;
using Digitalizer.DeliveryPlatform.WebApi.ResultsApi;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Digitalizer.DeliveryPlatform.WebApi.Features.Customer;

public class RegisterCustomerEndpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("/AddCustomer", AddCustomerAsync)
           .WithName("AddCustomer")
           .WithTags(Tags.Customer)
           .WithOpenApi(operation =>
           {
               operation.Summary = "Register a new customer";
               operation.Description = "Allows registering a new customer to the delivery platform";
               return operation;
           }).RequireAuthorization();
        //.RequireAuthorization(new AuthorizeAttribute { Roles = "Customer" });
    }

    private static async Task<IResult> AddCustomerAsync(IMediator mediator, [FromBody] RequestRegisterCustomer request)
    {
        var query = new RegisterCustomerCommand(request.FirstName, request.LastName, request.Account.Email,
            request.Account.Password, request.BirthDate, request.Adress.Street,
            request.Adress.City, request.Adress.PostalCode, request.Adress.Country);

        var result = await mediator.Send(query).ConfigureAwait(false);

        return result.Match(Results.Ok, ApiResults.Problem);
    }

    internal sealed class RequestRegisterCustomer
    {
        public string FirstName { get; init; }
        public string LastName { get; init; }
        public DateTime BirthDate { get; init; }
        public Address Adress { get; init; }
        public Account Account { get; init; }
    }

    internal sealed class Address
    {
        public string Street { get; init; }
        public string City { get; init; }
        public string PostalCode { get; init; }
        public string Country { get; init; }
    }

    internal sealed class Account
    {
        public string Email { get; init; }
        public string Password { get; init; }
    }
}
