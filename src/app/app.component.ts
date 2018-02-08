import { HelperService } from './services/helper.service';
import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-my-app',
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
    public loading = false;

    constructor(private helperService: HelperService) {
        this.helperService.loading.subscribe(res => {
            this.loading = res || false;
        });
    }

    ngOnInit() {
        $.material.init();
    }
}
