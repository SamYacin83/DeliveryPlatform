using Digitalizer.DeliveryPlatform.Application.Features.ProductCategory;
using Digitalizer.DeliveryPlatform.Application.Features.ProductCategory.UpdateProductCategory;
using Digitalizer.DeliveryPlatform.WebApi.EndPoints;
using Digitalizer.DeliveryPlatform.WebApi.ResultsApi;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Digitalizer.DeliveryPlatform.WebApi.Features.ProductCategory;

internal sealed class UpdateProductCategoryEndPoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPut("/UpdateProductCat", UpdateProductCatAsync)
           .WithName("UpdateProductCat")
           .WithTags(Tags.ProductCategory)
           .WithOpenApi(operation =>
           {
               operation.Summary = "Update an existing product";
               operation.Description = "Allows updating an existing product in the delivery platform";
               return operation;
           });
    }

    private static async Task<IResult> UpdateProductCatAsync(IMediator mediator, [FromBody] ProductCategoryDto productCatDto)
    {
        var query = new UpdateProductCategoryCommand(productCatDto.Id, productCatDto.Name, productCatDto.Description);
        var result = await mediator.Send(query).ConfigureAwait(false);

        return result.Match(Results.Ok, ApiResults.Problem);
    }
}
