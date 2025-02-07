using Digitalizer.DeliveryPlatform.Application.Features.ProductCategory.DeleteProductCategory;
using Digitalizer.DeliveryPlatform.WebApi.EndPoints;
using Digitalizer.DeliveryPlatform.WebApi.ResultsApi;
using MediatR;

namespace Digitalizer.DeliveryPlatform.WebApi.Features.ProductCategory;

internal sealed class DeleteProductCategoryEndPoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapDelete("/DeleteProductCat", DeleteProductCatAsync)
           .WithName("DeleteProductCat")
           .WithTags(Tags.ProductCategory)
           .WithOpenApi(operation =>
           {
               operation.Summary = "Delete an existing product category";
               operation.Description = "Allows deleting an existing product category from the delivery platform";
               return operation;
           }).RequireAuthorization(policy => policy.RequireRole("Supplier", "Admin"));
    }

    private static async Task<IResult> DeleteProductCatAsync(IMediator mediator, Guid categoryId)
    {
        var query = new DeleteProductCategoryCommand(categoryId);
        var result = await mediator.Send(query).ConfigureAwait(false);

        return result.Match(Results.NoContent, ApiResults.Problem);
    }
}
