import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TuiDialogService } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChildComponent } from './components/child/child.component';
import { TestModule } from './components/test/test.module';
import { MainInterceptor } from './interceptors/main.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { TaigaModule } from './modules/taiga/taiga.module';
import { UserModule } from './modules/user/user.module';
import { MainComponent } from './pages/main/main.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoaderService } from './components/loader/loader.service';
import { clientReducer } from './store/reducers/client.reducer';
import { clientExercisesReducer } from './store/reducers/client-exercises.reducer';


@NgModule({
  declarations: [AppComponent, MainComponent, NotFoundComponent, ChildComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ clientsState: clientReducer, clientExercisesState: clientExercisesReducer }),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    BrowserAnimationsModule,
    TaigaModule,
    UserModule,
    AuthModule,
    TestModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MainInterceptor,
      multi: true,
    },
    {
      provide: POLYMORPHEUS_CONTEXT,
      useExisting: TuiDialogService
    },
    LoaderService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
