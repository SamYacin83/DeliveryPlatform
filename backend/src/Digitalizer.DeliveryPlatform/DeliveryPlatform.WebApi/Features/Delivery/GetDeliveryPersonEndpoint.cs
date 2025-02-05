using Digitalizer.DeliveryPlatform.Application.Features.DeliveryPerson;
using Digitalizer.DeliveryPlatform.Application.Features.DeliveryPerson.AddDeliveryPerson;
using Digitalizer.DeliveryPlatform.WebApi.ResultsApi;
using Digitalizer.DeliveryPlatform.WebApi.EndPoints;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Digitalizer.DeliveryPlatform.Application.Features.DeliveryPerson.GetDeliveryPerson;

namespace Digitalizer.DeliveryPlatform.WebApi.Features.Delivery;

internal sealed class GetDeliveryPersonEndpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("/GetDeliveryPerson/{id}", GetDeliveryPersonAsync)
           .WithName("GetDeliveryPerson")
           .WithTags("Delivery")
           .WithOpenApi();

        static async Task<IResult> GetDeliveryPersonAsync(IMediator mediator, Guid id)
        {
            var query = new GetDeliveryPersonQuery(id);
            var result = await mediator.Send(query).ConfigureAwait(false);
            return result.Match(Results.Ok, ApiResults.Problem);
        }
    }
}


