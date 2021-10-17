import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';

describe('CreateCustomer', () => {
  it('should be able to create a new customer', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();

    const createCustomer = new CreateCustomerService(fakeCustomersRepository);

    const customer = await createCustomer.execute({
      name: 'Gabriel',
      email: 'gabriel@email.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create two customers with the same email', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();

    const createCustomer = new CreateCustomerService(fakeCustomersRepository);

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
