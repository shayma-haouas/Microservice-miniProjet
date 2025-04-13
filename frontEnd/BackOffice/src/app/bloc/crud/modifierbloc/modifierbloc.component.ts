import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { blocfoyerService } from 'src/app/services/blocfoyer.service';
import { foyer } from 'src/app/models/foyer';
import { bloc } from 'src/app/models/bloc';

@Component({
  selector: 'app-modifierbloc',
  templateUrl: './modifierbloc.component.html',
  styleUrls: ['./modifierbloc.component.css']
})
export class ModifierblocComponent implements OnInit {

  bloc: bloc = { nomBloc: '', capaciteBloc: 0, foyer: null };  // Initialize the bloc object
  foyers: foyer[] = [];  // List of foyers to populate the dropdown

  constructor(
    private blocService: blocfoyerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the bloc ID from the route parameters
    const blocId = +this.route.snapshot.paramMap.get('id')!;

    // Fetch the current details of the bloc to edit
    this.blocService.getblocById(blocId).subscribe((data) => {
      this.bloc = data;
    });

    // Fetch the list of foyers for the dropdown
    this.blocService.getAllFoyers().subscribe((data) => {
      this.foyers = data;
    });
  }

  // Function to update the bloc
  modifierBloc(): void {
    const blocId = +this.route.snapshot.paramMap.get('id')!;
    
    // Call the update method from the service
    this.blocService.updatebloc(blocId, this.bloc).subscribe(() => {
      // Navigate to the bloc list or another relevant page after the update
      this.router.navigate(['/blocs']);
    });
  }
}
