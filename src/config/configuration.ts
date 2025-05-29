export default () => {
  console.log('Configuration, IS_DEV:', process.env.IS_DEV);
  if (process.env.IS_DEV) {
    return {
      type: 'mysql' as const,
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'password',
      database: 'accountant',
    };
  } else {
    return {
      type: 'mysql' as const,
      host: '10.11.33.5',
      port: 3306,
      username: 'accountantuser',
      password: 'Accountant1234',
      database: 'accountant',
    };
  }
};
