import { FormGroup } from '@angular/forms';

export interface ViewEditForm {
    form: FormGroup;
    latestSavedData: any;
    save(): void;
    edit(): void;
    cancel(): void;
}
