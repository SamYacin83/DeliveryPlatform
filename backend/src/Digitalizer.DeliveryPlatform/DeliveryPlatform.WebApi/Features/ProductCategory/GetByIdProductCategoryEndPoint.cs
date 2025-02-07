using Digitalizer.DeliveryPlatform.Application.Features.Product.GetProduct;
using Digitalizer.DeliveryPlatform.Application.Features.ProductCategory.GetProductCategory;
using Digitalizer.DeliveryPlatform.WebApi.EndPoints;
using Digitalizer.DeliveryPlatform.WebApi.ResultsApi;
using MediatR;

namespace Digitalizer.DeliveryPlatform.WebApi.Features.ProductCategory;

internal sealed class GetByIdProductCategoryEndPoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("/GetProductCat", GetByIdProductCatAsync)
           .WithName("GetProductCatByIdProductCat")
           .WithTags(Tags.ProductCategory)
           .WithOpenApi(operation =>
           {
               operation.Summary = "Get product details by ID";
               operation.Description = "Returns the details of a product by its ID";
               return operation;
           });
    }

    private static async Task<IResult> GetByIdProductCatAsync(IMediator mediator, Guid categoryId)
    {
        var query = new GetProductCategoryQuery(categoryId);
        var result = await mediator.Send(query).ConfigureAwait(false);

        return result.Match(Results.Ok, ApiResults.Problem);
    }
}
