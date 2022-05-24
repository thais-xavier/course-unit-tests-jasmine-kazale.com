import { ClienteIdPipe } from "./cliente-id.pipe";

describe('Suite de testes de formatação do id cliente', () => {
    let clienteIdPipe : ClienteIdPipe;

    beforeEach(() => {
        clienteIdPipe = new ClienteIdPipe();
    });

    it('deve retornar o valor do id formatado como ####-#######/##0', () => {
        expect(clienteIdPipe.transform('1234567890123')).toEqual('1234-5678901/23');
    });

    it('deve retornar o mesmo valor quando id não contiver 13 digitos', () => {
        expect(clienteIdPipe.transform('12345')).toEqual('12345');
        expect(clienteIdPipe.transform('12345678901234')).toEqual('12345678901234');
    });
})