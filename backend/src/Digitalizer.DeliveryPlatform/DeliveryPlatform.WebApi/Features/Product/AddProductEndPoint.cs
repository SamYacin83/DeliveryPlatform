using Digitalizer.DeliveryPlatform.Application.Features.Product;
using Digitalizer.DeliveryPlatform.Application.Features.Product.AddProduct;
using Digitalizer.DeliveryPlatform.WebApi.EndPoints;
using Digitalizer.DeliveryPlatform.WebApi.ResultsApi;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Digitalizer.DeliveryPlatform.WebApi.Features.Product;

internal sealed class AddProductEndPoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("/AddProduct", AddProductAsync)
           .WithName("AddProduct")
           .WithTags(Tags.Product)
           .WithOpenApi(operation =>
           {
               operation.Summary = "Add a new product";
               operation.Description = "Allows adding a new product to the delivery platform";
               return operation;
           }).RequireAuthorization(policy => policy.RequireRole("Supplier", "Admin"));
    }

    private static async Task<IResult> AddProductAsync(IMediator mediator, [FromBody] ProductDto productDto)
    {
        var query = new AddProductCommand(productDto.Name, productDto.Description, productDto.PriceAmount, productDto.Currency, productDto.CategoryId, productDto.PictureUrl, productDto.StockQuantity);
        var result = await mediator.Send(query).ConfigureAwait(false);

        return result.Match(Results.Ok, ApiResults.Problem);
    }
}
