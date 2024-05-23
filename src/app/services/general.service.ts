import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface QFilter {
  key: string;
  value: any;
}

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private afs: AngularFirestore) { }

  addItem(collection: string, item: any) {
    // if (item.id) {
      delete item.id;
    // }
    return this.afs.collection(collection).add(item);
  }

  getItems(collectionUrl: string, lastDoc: any, filters: QFilter[], limit: number) {
    let collectionRef = this.afs.collection(collectionUrl).ref.orderBy('date', 'desc');
    if (filters.length > 0) {
      for (const filter of filters) {
        collectionRef = collectionRef.where(filter.key, '==', filter.value);
      }
    }
    if (lastDoc) {
      collectionRef = collectionRef.startAfter([lastDoc]);
    }
    if (limit) {
      collectionRef = collectionRef.limit(limit);
    }
    return collectionRef.get();
  }

  getSingle(collection: string, itemId: string) {
    return this.afs.doc(`${collection}/${itemId}`).get().toPromise();
  }

  updateItem(collection: string, item: any) {
    const itemId = item.id;
    delete item.id;
    this.afs.doc(`${collection}/${itemId}`).update(item);
    return itemId;
  }

  delete(url: string) {
    return this.afs.doc(url).delete();
  }


}
