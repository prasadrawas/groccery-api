interface BaseRepository {
  getAll(_id: string): Promise<any>;
  get(id: string): Promise<any>;
  add(data: Object): Promise<any>;
  delete(id: string): Promise<any>;
  update(id: string, data: Object): Promise<any>;
}

export default BaseRepository;
