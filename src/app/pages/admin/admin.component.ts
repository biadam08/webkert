import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, finalize } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

  categories: any[] = [];
  selectedFile: any = null;
  downloadURL: Observable<string> | undefined;

  addProductForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
  });

  addCategoryForm = new FormGroup({  
    name: new FormControl('', Validators.required),
  });
  fb: any;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private storage: AngularFireStorage,
    private router: Router
  ) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  
  onAddProduct() {
    if (this.addProductForm.valid && this.selectedFile) {
      const productData = this.addProductForm.value;
      var n = Date.now();
      const filePath = `images/${n}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.selectedFile);
  
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            if (url) {
              productData.imageUrl = url;
              this.productService.addProduct(productData).then(() => {
                console.log("Termék sikeresen hozzáadva");
                this.router.navigate(['/admin/successful']);
              }).catch(error => {
                console.error("Hiba történt a termék hozzáadása közben", error);
              });
            }
          });
        })
      ).subscribe();
    } else {
      if (!this.selectedFile) {
        alert('A kép kiválasztása kötelező!');
      }
    }
  }

  onAddCategory() {
    if (this.addCategoryForm.valid) {
      const categoryName = this.addCategoryForm.get('name')?.value;
      this.categoryService.addCategory(categoryName).then(() => {
        console.log("Kategória sikeresen hozzáadva");
        this.router.navigate(['/admin/successful']);
      }).catch(error => {
        console.error("Hiba történt a kategória hozzáadása közben", error);
      });
    }
  }

  removeAccentsAndLowercase(input: string): string {
    return input.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

}
