/**
 * Arquivo de teste do componente ClienteListarComponent.
 *
 * @author Márcio Casale de Souza <contato@kazale.com>
 * @since 0.0.3
 */

import { TestBed, ComponentFixture } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { ClienteListarComponent } from "./";
import { ClienteService, Cliente, ClienteIdPipe } from "../";
import {
  ModalUtilComponent,
  KzPaginacaoComponent,
  RouterLinkStubDirective,
  ActivatedRouteStub,
} from "../../";

describe("ClienteListar", () => {
  let fixture: ComponentFixture<ClienteListarComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let clienteService: ClienteService;
  let clientes: Cliente[] = [
    new Cliente(1234567890123, "Fulano"),
    new Cliente(9876543210987, "Ciclano"),
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ClienteListarComponent,
        ModalUtilComponent,
        KzPaginacaoComponent,
        RouterLinkStubDirective,
        ClienteIdPipe,
      ],
      providers: [
        ClienteService,
        {
          provide: ActivatedRoute,
          useValue: new ActivatedRouteStub(),
        },
      ],
    });

    fixture = TestBed.createComponent(ClienteListarComponent);

    //Mock ClienteService
    clienteService = TestBed.get(ClienteService);
    spyOn(clienteService, "totalRegistros").and.returnValue(2);
    spyOn(clienteService, "listarParcial").and.returnValue(clientes);
  });

  it("deve  verificar se o título foi definifo corretamente", () => {
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css("h1"));
    el = de.nativeElement;

    expect(el.textContent).toContain("Listagem de Clientes");
  });

  it("deve verificar a quantidade de linhas da tabela", () => {
    fixture.detectChanges();

    let des: DebugElement[] = fixture.debugElement.queryAll(
      By.css("table > tbody > tr")
    );
    expect(clienteService.listarParcial).toHaveBeenCalled();
    expect(clienteService.listarParcial).toHaveBeenCalledTimes(1);
    expect(des.length).toEqual(3);
  });

  it("deve certificar que o ID está sendo formatado", () => {
    fixture.detectChanges();

    let des: DebugElement[] = fixture.debugElement.queryAll(
      By.css("table > tbody > tr")
    );
    let elem1 = des[1].children[0].nativeElement;
    let elem2 = des[2].children[0].nativeElement;

    expect(elem1.textContent).toContain("1234-5678901/23");
    expect(elem2.textContent).toContain("9876-5432109/87");
  });

  it("deve verificar que existe uma paginação presente", () => {
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css("kz-paginacao"));

    expect(de.nativeElement).toBeDefined();
  });
});
