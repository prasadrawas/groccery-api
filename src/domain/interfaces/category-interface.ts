interface ICategoryRepository {
  getAllCategories(): Promise<any>;
  getCategoryById(id: string): Promise<any>;
  createCategory(data: Object, file: any): Promise<any>;
  deleteCategoryById(id: string): Promise<any>;
  updateCategoryById(id: string, data: Object, image: any): Promise<any>;
}

export default ICategoryRepository;
