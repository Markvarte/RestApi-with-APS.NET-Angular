import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http'
import { Tenant, DefaultTenant } from './tenant';
import { Flat } from '../flats/flat';
import { TenantsService } from '../tenants.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.css']
})
export class TenantsComponent implements OnInit { 
  constructor(private tenantService : TenantsService) {
    tenantService.get().subscribe((data: Array<Tenant>) => this.tenant = data);
    this.currentTenant = this.getDefaultTenant();
  }

  @Input() TenantVisible : number; // for tenant list / contains flat id ? - yes
  @Input() tenant: Array<Tenant>;
  public currentTenant: Tenant;

  private getDefaultTenant() {
    return new DefaultTenant();
  }

  public createUpdateTenant(data: Tenant) {

    data.flatId = this.TenantVisible;
    let tenantWithId = _.find(this.tenant, (el => el.id === data.id));
    if (tenantWithId) {
      const updateIndex = _.findIndex(this.tenant, { id: tenantWithId.id });
      this.tenantService.update(data).subscribe(() => {
         this.tenant.splice(updateIndex, 1, data)
      });
    } else {
      data.id = this.tenant[this.tenant.length - 1].id + 1; // solution for Internal server error
      this.tenantService.add(data).subscribe(
        () => {
           this.tenant.push(data);
        }
      );
    }
    this.currentTenant = this.getDefaultTenant();
  };

  public deleteT(data : Tenant) {
    const deleteIndex = _.findIndex(this.tenant, { id: data.id });
    this.tenantService.remove(data).subscribe(
      () => this.tenant.splice(deleteIndex, 1)
    );
  }
  public editT(data : Tenant) {
   // this.editClicked.emit(Object.assign({}, data));
   this.currentTenant = data;
  }
  public new(data : Tenant) { // new is blank for now
    this.currentTenant = data;
  }
    ngOnInit() {}
}
