using Digitalizer.DeliveryPlatform.Application.Features.Product;
using Digitalizer.DeliveryPlatform.Application.Features.Product.UpdateProduct;
using Digitalizer.DeliveryPlatform.WebApi.EndPoints;
using Digitalizer.DeliveryPlatform.WebApi.ResultsApi;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Digitalizer.DeliveryPlatform.WebApi.Features.Product;

internal sealed class UpdateProductEndPoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPut("/UpdateProduct", UpdateProductAsync)
           .WithName("UpdateProduct")
           .WithTags(Tags.Product)
           .WithOpenApi(operation =>
           {
               operation.Summary = "Update an existing product";
               operation.Description = "Allows updating an existing product in the delivery platform";
               return operation;
           }).RequireAuthorization(policy => policy.RequireRole("Supplier", "Admin"));
    }

    private static async Task<IResult> UpdateProductAsync(IMediator mediator, [FromBody] ProductDto productDto)
    {
        var query = new UpdateProductCommand(productDto.Id, productDto.Name, productDto.Description, productDto.PriceAmount, productDto.Currency, productDto.CategoryId, productDto.StockQuantity);
        var result = await mediator.Send(query).ConfigureAwait(false);

        return result.Match(Results.Ok, ApiResults.Problem);
    }
}

