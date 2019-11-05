import {
  Component,
  OnInit,
  HostBinding,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { MemberDetails } from '../models/vendor-members';
import { IsModalService, IsModalSize, IsButton } from '../../../lib';
import { IsToasterService, IsToastPosition } from '../../../lib/toaster';
import { SidebarLinks } from '../models/sidebar-links';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '@app/shared/services/data.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  @HostBinding() class: string =
    'd-flex flex-column col p-0 overflow-y-auto overflow-x-hidden';
  user: MemberDetails;
  editBtnEnabled: boolean;
  notificationCount: number = 0;
  autoGenerateLinks = SidebarLinks;
  logoEditCancelled: boolean = false;
  bannerEditCancelled: boolean = false;
  selectFranchiseForm: FormGroup;
  franchises: any = [];
  mainFranchise: any;
  loading = false;
  notifications = []

  @ViewChild('selectedFranchise') selectedFranchise: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private isModal: IsModalService,
    private toaster: IsToasterService,
    private dataService: DataService
  ) {}

  ngOnInit() {
  }

  signOut() {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('franchiseId');
    this.router.navigate(['/']);
  }


  logoutHandler() {
    localStorage.clear();
    this.user = {};
    this.router.navigate(['auth']);
  }

  onFranchiseSubmit(btn : IsButton) {
    let temp = this.selectFranchiseForm.value;
    // console.log('selectedFranchise is ', temp.franchiseSelected)
    btn.startLoading();
    this.dataService.setFranchiseId(temp.franchiseSelected);
  }
}
