import {Component, inject, OnInit} from '@angular/core';
import {Nft} from '../../models/nft';
import {NftAuctionsTableComponent} from '../../components/nft/nft-auctions-table/nft-auctions-table.component';
import {NftChartCardComponent} from '../../components/nft/nft-chart-card/nft-chart-card.component';
import {NftSingleCardComponent} from '../../components/nft/nft-single-card/nft-single-card.component';
import {NftDualCardComponent} from '../../components/nft/nft-dual-card/nft-dual-card.component';
import {NftHeaderComponent} from '../../components/nft/nft-header/nft-header.component';
import {Chart, registerables} from 'chart.js';
import {ProductService} from "../../../../core/components/services/product/product.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {TeamService} from "../../../../core/components/services/team/team.service";
import {NgIf} from "@angular/common";

Chart.register(...registerables);

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  standalone: true,
  imports: [
    NftHeaderComponent,
    NftDualCardComponent,
    NftSingleCardComponent,
    NftChartCardComponent,
    NftAuctionsTableComponent,
    NgIf,
    RouterLink,
  ],
})
export class NftComponent implements OnInit {
  products: any[] = [];
  chart: any;
  chartLabels: string[] = [];
  chartData: { [key: string]: number[] } = {}; // Données par marque
  categories: string[] = []; // Liste des catégories
  private activatedRoute = inject(ActivatedRoute)
  nft: Array<Nft>;


  private productService = inject(ProductService);
  private activatedRouter = inject(ActivatedRoute);
  private teamService = inject(TeamService);

  constructor() {
    this.nft = [
      {
        id: 34356771,
        title: 'Girls of the Cartoon Universe',
        creator: 'Jhon Doe',
        instant_price: 4.2,
        price: 187.47,
        ending_in: '06h 52m 47s',
        last_bid: 0.12,
        image: './assets/images/img-01.jpg',
        avatar: './assets/avatars/avt-01.jpg',
      },
      {
        id: 34356772,
        title: 'Pupaks',
        price: 548.79,
        last_bid: 0.35,
        image: './assets/images/img-02.jpg',
      },
      {
        id: 34356773,
        title: 'Seeing Green collection',
        price: 234.88,
        last_bid: 0.15,
        image: './assets/images/img-03.jpg',
      },
    ];
  }

  ngOnInit(): void {
    // Récupérer les produits et mettre à jour le graphique
    this.findAll();
    this.loadLastFourProducts()
    this.loadLastFourUsers()

  }

  findAll(): void {
    this.productService.findAll().subscribe({
      next: (value) => {
        console.log(value);
        this.products = value;

        // Préparer et afficher les données par mois
        this.prepareMonthlyChartData(this.products);
        this.updateMonthlyChart(); // Mettre à jour le graphique avec les données mensuelles
      },
      error: (err) => console.log('Erreur lors du chargement des produits'),
    });
  }


  prepareMonthlyChartData(products: any[]): void {
    // Initialiser les données
    const monthlyData: { [monthYear: string]: number } = {};

    // Parcourir les produits
    products.forEach((product) => {
      const createdDate = new Date(product.createdDate); // Assurez-vous que `createdDate` est au format 'YYYY-MM-DD'
      const month = createdDate.toLocaleString('default', {month: 'long'}); // Obtenir le mois (ex. "December")
      const year = createdDate.getFullYear(); // Obtenir l'année
      const monthYear = `${month} ${year}`; // Format "Mois Année" (ex. "December 2024")

      // Initialiser le mois s'il n'existe pas
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = 0;
      }

      // Incrémenter le nombre de produits pour ce mois
      monthlyData[monthYear]++;
    });

    // Préparer les labels et les données pour le graphique
    this.chartLabels = Object.keys(monthlyData); // Mois et années (ex. ["December 2024"])
    this.chartData = {Products: Object.values(monthlyData)}; // Nombre de produits par mois
  }


  updateMonthlyChart(): void {
    // Si le graphique existe déjà, le détruire pour éviter des conflits
    if (this.chart) {
      this.chart.destroy();
    }

    // Préparer les datasets pour le graphique
    const datasets = [
      {
        label: 'Number of products',
        data: this.chartData['Products'], // Données des produits par mois
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ];

    // Créer un nouveau graphique avec les données mises à jour
    this.chart = new Chart('MyChart', {
      type: 'bar',
      data: {
        labels: this.chartLabels, // Mois et années
        datasets: datasets, // Données
      },
      options: {
        scales: {
          y: {
            beginAtZero: true, // Commence à 0
            ticks: {
              stepSize: 1, // Incrémentation de 1
            },
          },
        },
        responsive: true,
        aspectRatio: 3,
        plugins: {
          legend: {
            display: true,
          },

          tooltip: {
            callbacks: {
              label: (context) => `${context.raw} produits`,
            },
          },
        },
      },
    });
  }

  fourProducts: any

  loadLastFourProducts(): void {
    this.productService.findAll().subscribe({
      next: (products) => {
        this.fourProducts = this.getLastFourProducts(products); // Filtrer les 4 derniers produits
        console.log(this.fourProducts)
      },
      error: (err) => console.error('Erreur lors du chargement des produits', err),
    });
  }

  fourusers: any

  loadLastFourUsers(): void {
    this.teamService.findAll().subscribe({
      next: (teams) => {
        this.fourusers = this.getLastFourUsers(teams); // Filtrer les 4 derniers produits
        console.log(this.fourusers)
      },
      error: (err) => console.error('Erreur lors du chargement des users', err),
    });
  }

  getLastFourProducts(products: any[]): any[] {
    const sortedProducts = products.sort((a, b) =>
      new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    );

    return sortedProducts.slice(0, 4);
  }

  getLastFourUsers(users: any[]): any[] {
    const sortedusers = users.sort((a, b) =>
      new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    );

    return sortedusers.slice(0, 8);
  }

}



