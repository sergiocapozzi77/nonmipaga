import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpClient,
} from "@angular/common/http";
import { catchError, filter, take, switchMap } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("Interception In Progress", req);
    const token: string = localStorage.getItem("token");
    console.log("Token", token);

    if (req.url.indexOf("googleapis.com") > -1) {
      return next.handle(req);
    }

    req = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + token),
    });
    req = req.clone({
      headers: req.headers.set("Content-Type", "application/json"),
    });
    req = req.clone({ headers: req.headers.set("Accept", "application/json") });

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        //401 UNAUTHORIZED
        if (error && error.status === 401) {
          console.log("ERROR 401 UNAUTHORIZED");
        }
        const err = error.error.message || error.statusText;
        return throwError(error);
      })
    );
  }
}
