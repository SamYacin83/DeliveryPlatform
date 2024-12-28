using Digitalizer.DeliveryPlatform.Application.Features.ProductCategory;
using Digitalizer.DeliveryPlatform.Application.Features.ProductCategory.AddProductCategory;
using Digitalizer.DeliveryPlatform.WebApi.EndPoints;
using Digitalizer.DeliveryPlatform.WebApi.ResultsApi;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Digitalizer.DeliveryPlatform.WebApi.Features.ProductCategory;

internal sealed class AddProductCategoryEndPoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("/AddProductCat", AddProductCatAsync)
           .WithName("AddProductCat")
           .WithTags(Tags.ProductCategory)
           .WithOpenApi(operation =>
           {
               operation.Summary = "Add a new product category";
               operation.Description = "Allows adding a new product category to the delivery platform";
               return operation;
           });
    }

    private static async Task<IResult> AddProductCatAsync(IMediator mediator, [FromBody] ProductCategoryDto productCategoryDto)
    {
        var query = new AddProductCategoryCommand(productCategoryDto.Name, productCategoryDto.Description);
        var result = await mediator.Send(query).ConfigureAwait(false);

        return result.Match(Results.Ok, ApiResults.Problem);
    }
}
