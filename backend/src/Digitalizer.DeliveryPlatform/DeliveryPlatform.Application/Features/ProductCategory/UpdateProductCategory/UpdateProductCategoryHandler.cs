﻿using Digitalizer.DeliveryPlatform.Application.Features.Product;
using Digitalizer.DeliveryPlatform.Application.Interfaces;
using Digitalizer.DeliveryPlatform.Common.Messaging;
using Digitalizer.DeliveryPlatform.Common.Results;
using Digitalizer.DeliveryPlatform.Domain.Aggregates.ProductCategory;

namespace Digitalizer.DeliveryPlatform.Application.Features.ProductCategory.UpdateProductCategory;
public class UpdateProductCategoryHandler(IProductCategoryRepository repositoryCategory, IUnitOfWork unitOfWork): ICommandHandler<UpdateProductCategoryCommand, ProductCategoryDto>
{
    public async Task<Result<ProductCategoryDto>> Handle(UpdateProductCategoryCommand request, CancellationToken cancellationToken)
    {
        if(request.Id == null)
          return (Result<ProductCategoryDto>)Result.Failure(new ErrorResult("InvalidId", "Category Id cannot be null", ErrorType.Validation));

        var category = await repositoryCategory.GetByIdAsync(request.Id.Value).ConfigureAwait(false);

        if (category == null)
            return Result.Failure<ProductCategoryDto>(ErrorResult.NotFound("CategoryNotFound", $"Category with ID {request.Id} not found."));

        category.Update(request.Name, request.Description);

        await unitOfWork.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        return Result.Success(new ProductCategoryDto
        {
            CategoryId = category.Id,
            Name = category.Name,
            Description = category.Description
        });
    }
}
