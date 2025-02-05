using Digitalizer.DeliveryPlatform.Application.Features.DeliveryPerson;
using Digitalizer.DeliveryPlatform.Application.Features.DeliveryPerson.AddDeliveryPerson;
using Digitalizer.DeliveryPlatform.WebApi.ResultsApi;
using Digitalizer.DeliveryPlatform.WebApi.EndPoints;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Digitalizer.DeliveryPlatform.Application.Features.DeliveryPerson.GetDeliveryPerson;
using Digitalizer.DeliveryPlatform.Application.Features.DeliveryPerson.GetAllDeliveryPersons;

namespace Digitalizer.DeliveryPlatform.WebApi.Features.Delivery;

internal sealed class GetAllDeliveryPersonsEndpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("/GetAllDeliveryPersons", GetAllDeliveryPersonsAsync)
           .WithName("GetAllDeliveryPersons")
           .WithTags("Delivery")
           .WithOpenApi();

        static async Task<IResult> GetAllDeliveryPersonsAsync(IMediator mediator)
        {
            var query = new GetAllDeliveryPersonsQuery();
            var result = await mediator.Send(query).ConfigureAwait(false);
            return result.Match(Results.Ok, ApiResults.Problem);
        }
    }
}


