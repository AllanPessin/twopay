import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a category', async () => {
    const createCategoryDto = {
      name: 'Test Category',
    };

    const result = await service.create(createCategoryDto);

    expect(result).toEqual({
      id: expect.any(Number),
      ...createCategoryDto,
    });
  });

  it('should find all categories', async () => {
    const result = await service.findAll();
    expect(result).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      expense: expect.any(Array),
    });
  });
});
