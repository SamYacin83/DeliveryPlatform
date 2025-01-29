using Digitalizer.DeliveryPlatform.Application.Features.DeliveryPerson.AddDeliveryPerson;
using Digitalizer.DeliveryPlatform.Application.Features.DeliveryPerson.GetDeliveryPersonLocation;
using Digitalizer.DeliveryPlatform.Infrastructure.Services;
using Digitalizer.DeliveryPlatform.WebApi.Features;
using Digitalizer.DeliveryPlatform.WebApi.ResultsApi;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Digitalizer.DeliveryPlatform.WebApi.EndPoints.Delivery;

internal sealed class GetDeliveryPersonLocationEndpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("/deliverypersonslocation", GetLocationAsync)
           .WithName("GetDeliveryPersonLocation")
           .WithTags(Tags.Delivery)
           .WithOpenApi(operation =>
           {
               operation.Summary = "Get a delivery person's location";
               operation.Description = "Returns the current location of a delivery person.";
               return operation;
           });
    }

    private static async Task<IResult> GetLocationAsync(IMediator mediator, Guid id)
    {
        if (id == Guid.Empty)
            return Results.BadRequest("Invalid ID");

        var query = new GetDeliveryPersonLocationQuery(id);
        var result = await mediator.Send(query).ConfigureAwait(false);

        return result.Match(Results.Ok, ApiResults.Problem);
    }
}