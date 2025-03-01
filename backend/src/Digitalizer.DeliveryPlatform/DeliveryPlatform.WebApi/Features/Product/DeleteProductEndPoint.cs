﻿using Digitalizer.DeliveryPlatform.Application.Features.Product;
using Digitalizer.DeliveryPlatform.Application.Features.Product.DeleteProduct;
using Digitalizer.DeliveryPlatform.WebApi.EndPoints;
using Digitalizer.DeliveryPlatform.WebApi.ResultsApi;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Digitalizer.DeliveryPlatform.WebApi.Features.Product;

internal sealed class DeleteProductEndPoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapDelete("/DeleteProduct", DeleteProductAsync)
           .WithName("DeleteProduct")
           .WithTags(Tags.Product)
           .WithOpenApi(operation =>
           {
               operation.Summary = "Delete an existing product";
               operation.Description = "Allows deleting an existing product from the delivery platform";
               return operation;
           }).RequireAuthorization(policy => policy.RequireRole("Supplier", "Admin"));
    }

    private static async Task<IResult> DeleteProductAsync(IMediator mediator, Guid id)
    {
        var query = new DeleteProductCommand(id);
        var result = await mediator.Send(query).ConfigureAwait(false);

        return result.Match(Results.NoContent, ApiResults.Problem);
    }
}
