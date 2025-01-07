using Digitalizer.DeliveryPlatform.Application.Features.Order.AddOrder;
using Digitalizer.DeliveryPlatform.WebApi.EndPoints;
using Digitalizer.DeliveryPlatform.WebApi.ResultsApi;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Digitalizer.DeliveryPlatform.WebApi.Features.Order;

internal sealed class AddOrderEndpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("/AddOrder", AddOrderAsync)
           .WithName("AddOrder")
           .WithTags(Tags.Order)
           .WithOpenApi(operation =>
           {
                operation.Summary = "Add a new order";
                operation.Description = "Allows adding a new order to the delivery platform";
                return operation;
           });
    }

    private static async Task<IResult> AddOrderAsync(IMediator mediator, [FromBody] RequestCard request)
    {
        var query = new AddOrderCommand(request.CustomerId, request.Street, request.City, request.PostalCode, request.Country);
        var result = await mediator.Send(query).ConfigureAwait(false);

        return result.Match(Results.Ok, ApiResults.Problem);
    }

    internal sealed class RequestCard
    {
        public Guid CustomerId { get; init; }
        public string Street { get; init; }
        public string City { get; init; }
        public string PostalCode { get; init; }
        public string Country { get; init; }
    }
}
