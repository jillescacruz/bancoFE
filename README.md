# BancoFE

Proyecto realizado como pruebas de transferencia de dinero entre cuentas de destinatario.

Fue generado con  [Angular CLI](https://github.com/angular/angular-cli) version 11.2.8.


El aplicativo actualmente posee 3 modulos:
1)Agregar destinatarios
    - Permite agregar destinatarios para próximas transferencias.
2)Transferencia
    - Permite seleccionar uno de los destinatarios creados en el primer punto.
    - Se valida que monto total a transferir no sea mayor a lo que el cliente tiene en su cuenta.

3)Histórico de movimientos
    - Permite visualizar los datos de los movimientos que se han realizado.


------ Flujo y Validaciones ------
¿Cómo comenzar?
Se crearon 2 clientes a modo de pruebas para que se puedan realizar transferencias a otras personas o entre ellos.
Usuario/pass:  denzel@denzel.com/denzel@denzel.com
Usuario/pass:  scarlett@scarlett.com/scarlett@scarlett.com

Cada usuario posee una cantidad de dinero ya asiganada, la cual se puede transferir a otros destinatarios o entre ellos.
Cabe destacar que al transferir dinero a otros destinatarios(no entre ellos) ese dinero se perderá.
Aun así, si se necesita cargar dinero, existe un servicio en el backEnd en donde se puede cargar, ejecutando directamente el servicio(no frontEnd).

El flujo actual de transferencia valida si el destinatario seleccionado pertenece a uno de los clientes actualmente creados. Es decir que si la transferencias es entre cliente, a ambas personas les aparecerá el movimiento. Uno de recepción y el otro de envío.


La url para ingresar al aplicativo es:

https://bancoripleypoc.web.app/



Para su ejecución en ambiente local se debe desplegar ejecutando:
`ng serve`
y se levantará en `http://localhost:4200/`.



Consideraciones:
- El servicio de bancos (https://bast.dev/api/banks.php) tiene código de bancos duplicados, por lo que se desplegará mas de 1 opción por pantalla.
- Faltan pruebas unitarias
- El logín es en base a mail/password y pueden ser creados en firebase/Authentication
- El hosting en donde se encuentra el aplicativo es firebase( Hosting)
- La base de datos es Firestore y utiliza los siguientes indices (Collection: movements	; Campo: rutWithOutVd Ascendente; Campo 2: date Descendente)