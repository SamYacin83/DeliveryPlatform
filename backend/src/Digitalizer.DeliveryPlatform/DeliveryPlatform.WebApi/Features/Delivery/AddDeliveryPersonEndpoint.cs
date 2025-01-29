using Digitalizer.DeliveryPlatform.Application.Features.DeliveryPerson;
using Digitalizer.DeliveryPlatform.Application.Features.DeliveryPerson.AddDeliveryPerson;
using Digitalizer.DeliveryPlatform.WebApi.ResultsApi;
using Digitalizer.DeliveryPlatform.WebApi.EndPoints;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Digitalizer.DeliveryPlatform.WebApi.Features.Delivery;

internal sealed class AddDeliveryPersonEndpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("/AddDeliveryperson", AddDeliveryPersonAsync)
           .WithName("AddDeliveryPerson")
           .WithTags(Tags.Delivery)
           .WithOpenApi(operation =>
           {
               operation.Summary = "Add a new delivery person";
               operation.Description = "Allows adding a new delivery person to the system";
               return operation;
           });
    }

    private static async Task<IResult> AddDeliveryPersonAsync(IMediator mediator, [FromBody] DeliveryPersonDto request)
    {
        var command = new AddDeliveryPersonCommand(
            request.FirstName,
            request.LastName,
            request.PhoneNumber,
            request.Email,
            request.Address.Street,
            request.Address.City,
            request.Address.PostalCode,
            request.Address.Country
        );

        var result = await mediator.Send(command).ConfigureAwait(false);

        return result.Match(Results.Ok, ApiResults.Problem);
    }
}


