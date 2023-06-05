import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-email-fail',
  templateUrl: './email-fail.component.html',
  styleUrls: ['./email-fail.component.scss']
})
export class EmailFailComponent implements OnInit {
  document: any;

  constructor(public dialogRef: MatDialogRef<EmailFailComponent>,@Inject(DOCUMENT) document: Document) {
    this.document = document;
  }

  ngOnInit(): void {
  }

  onClose() {
    location.href = location.href
  }

}
