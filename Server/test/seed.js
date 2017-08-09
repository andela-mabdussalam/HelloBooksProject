export default function seed(models) {
  return models.User.create({
    userName: 'Moyo',
    email: 'moyo@moyo.com',
    password: 'moyo',
  }, {
  })
    .catch(e => console.log(e));
}
