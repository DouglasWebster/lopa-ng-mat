import { NgModule, Component, Directive, ViewChild, ViewContainerRef, Injector, Inject, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { inject, async, fakeAsync, flushMicrotasks, ComponentFixture, TestBed, tick, } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http/';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule, MdDialogModule } from '@angular/material';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import { AuthenticationService, AlertService, UserService } from '../../shared/services';
import { RegisterDialogComponent } from './register-dialog.component';

describe('RegisterDialogComponent', () => {
  // fake the Authentification service
  const fakeUser = '{"firstName":"Micky","lastName":"Mouse","userName":"mMouse",'
    + '"password":"Password1","admin":true,"id":1}'

  const authenticationServiceStub = {
    isValid(username?: string, password?: string): Observable<String> {
      return new Observable<String>((subscriber: Subscriber<String>) => subscriber.next(JSON.parse(fakeUser)));
    }
  }

  let component: RegisterDialogComponent;
  let dialog: MdDialog;
  let overlayContainerElement: HTMLElement;

  let testViewContainerRef: ViewContainerRef;
  let viewContainerFixture: ComponentFixture<DlgTestChildViewContainerComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DialogTestModule,
        RouterTestingModule
      ],
      declarations: [
      ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        AlertService,
        UserService
      ]
    })
      .compileComponents();
  }));

  beforeEach(inject([MdDialog], (d: MdDialog) => {
    dialog = d;
  }));

  beforeEach(() => {
    const dialogRef = dialog.open(RegisterDialogComponent);
    component = dialogRef.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

@Directive({ selector: 'dir-with-view-container' })
class DlgTestViewContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

@Component({
  selector: 'lpa-arbitrary-component',
  template: `<dir-with-view-container></dir-with-view-container>`,
})
class DlgTestChildViewContainerComponent {
  @ViewChild(DlgTestViewContainerDirective) childWithViewContainer: DlgTestViewContainerDirective;

  get childViewContainer() {
    return this.childWithViewContainer.viewContainerRef;
  }
}

// Create a real (non-test) NgModule as a workaround for
// https://github.com/angular/angular/issues/10760
const TEST_DIRECTIVES = [
  DlgTestViewContainerDirective,
  DlgTestChildViewContainerComponent,
  RegisterDialogComponent
];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    MdDialogModule,
    ReactiveFormsModule,
    MaterialModule,
    NoopAnimationsModule
  ],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [
    RegisterDialogComponent
  ]
})
class DialogTestModule { }

