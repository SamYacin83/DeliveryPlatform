using Digitalizer.DeliveryPlatform.Application.Features.DeliveryPerson;
using Digitalizer.DeliveryPlatform.Application.Features.DeliveryPerson.AddDeliveryPerson;
using Digitalizer.DeliveryPlatform.WebApi.ResultsApi;
using Digitalizer.DeliveryPlatform.WebApi.EndPoints;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Digitalizer.DeliveryPlatform.Application.Features.DeliveryPerson.UpdateDeliveryPerson;

namespace Digitalizer.DeliveryPlatform.WebApi.Features.Delivery;

internal sealed class UpdateDeliveryPersonEndpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPut("/UpdateDeliveryPerson", UpdateDeliveryPersonAsync)
           .WithName("UpdateDeliveryPerson")
           .WithTags("Delivery")
           .WithOpenApi();

        static async Task<IResult> UpdateDeliveryPersonAsync(IMediator mediator, [FromBody] UpdateDeliveryPersonCommand command)
        {
            var result = await mediator.Send(command).ConfigureAwait(false);
            return result.Match(Results.Ok, ApiResults.Problem);
        }
    }
}

