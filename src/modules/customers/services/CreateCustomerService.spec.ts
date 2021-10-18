import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomersRepository);
  });

  it('should be able to create a new customer', async () => {
    const customer = await createCustomer.execute({
      name: 'Gabriel',
      email: 'gabriel@email.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create two customers with the same email', async () => {
    await createCustomer.execute({
      name: 'Gabriel',
      email: 'gabriel@email.com',
    });

    expect(
      createCustomer.execute({
        name: 'Gabriel',
        email: 'gabriel@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
