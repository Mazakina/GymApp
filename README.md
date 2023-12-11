# App

GymPass Style app.

## RFs

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível o número de  check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter um histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuario buscar academias pelo nome;
- [x] Deve ser possível o usuario fazer check-in em uma academia;
- [ ] Deve ser possível validar  o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não deve poder fazer 2 check-ins no mesmo dia;
- [x] O usuário  não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O checkin só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RFNs

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação  precisam estar persistidos em um banco PostgreeSql;
- [ ] Todas as listas de dados precisam estar paginadas com 20 items por página;
- [ ] O usuário precisa ser identificado por um JWT (JSON web token)