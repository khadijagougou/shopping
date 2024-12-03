import {MenuItem} from '../models/menu.model';
import {Injectable} from "@angular/core";
import {UserStorageService} from "../../modules/auth/storage/user-storage.service";

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Dashboard',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Dashboard',
          route: '/dashboard',
        },
        {
          icon: 'assets/icons/heroicons/outline/lock-closed.svg',
          label: 'Auth',
          route: '/auth',
          children: [
            {label: 'Sign up', route: '/auth/sign-up'},
            {label: 'Sign in', route: '/auth/sign-in'},
            {label: 'Forgot Password', route: '/auth/forgot-password'},
            {label: 'New Password', route: '/auth/new-password'},
            {label: 'Two Steps', route: '/auth/two-steps'},
          ],
        },


      ],
    },
    {
      group: 'Catalogue',
      items: [
        {
          icon: 'assets/icons/heroicons/outline/bookmark.svg',
          label: 'Marketplace',
          route: '/marketplace/marketplace',

        }, {
          icon: 'assets/icons/heroicons/outline/magnifying-glass.svg',
          label: 'Sourcing',
          children: [
            {label: 'Sourcing Create', route: '/sourcing/sourcing/create'},
            {label: 'Sourcing List', route: '/sourcing/sourcing/list'},            // { label: 'Podcast', route: '/dashboard/podcast' },
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/cube.svg',
          label: 'Manage Products',
          children: [
            {
              label: 'Attributes',
              children: [
                {label: 'Attribute List', route: '/attribute/attribute/list'},
                {label: 'Attribute Create', route: '/attribute/attribute/create'},
              ]
            },
            {
              label: 'Options',
              children: [
                {label: 'Option List', route: '/option/option/list'},
                {label: 'Option Create', route: '/option/option/create'},
              ]
            },
            {
              label: 'Categories',
              children: [
                {label: 'Category List', route: '/category/category/list'},
                {label: 'Category Create', route: '/category/category/create'},
              ]
            },
            {
              label: 'Brands',
              children: [
                {label: 'Brand List', route: '/brand/brand/list'},
                {label: 'Brand Create', route: '/brand/brand/create'},
              ]
            },
            {
              label: 'Products',
              children: [
                {label: 'Product List', route: '/product/product/list'},
                {label: 'Product Create', route: '/product/product/create'},
                {label: 'Product favorite', route: '/product/product/favorite'},
                {label: 'Product cart', route: '/product/product/cart'},
              ]
            },

          ],
        },

      ],
    },


    {
      group: 'Third Partie',
      items: [
        {
          icon: 'assets/icons/heroicons/outline/user-circle.svg',
          label: 'Forwarding Agent',
          children: [
            {label: 'Forwarding Agent Create', route: '/forwardingAgent/forwardingAgent/create'},
            {label: 'Forwarding Agent List', route: '/forwardingAgent/forwardingAgent/list'},
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/user-circle.svg',
          label: 'Transporter',
          children: [
            {label: 'Transporter Create', route: '/transporter/transporter/create'},
            {label: 'Transporter List', route: '/transporter/transporter/list'},
          ],
        },
      ],
    },

    {
      group: 'Administration',
      items: [
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Team',
          children: [
            {label: 'Team Create', route: '/team/team/create'},
            {label: 'Team List', route: '/team/team/list'},
          ],
        },

      ],
    },
  ];
  public static pagesAdmin: MenuItem[] = [
    {
      group: 'Dashboard',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Dashboard',
          route: '/dashboard',
        },
        {
          icon: 'assets/icons/heroicons/outline/lock-closed.svg',
          label: 'Auth',
          route: '/auth',
          children: [
            {label: 'Sign up', route: '/auth/sign-up'},
            {label: 'Sign in', route: '/auth/sign-in'},
            {label: 'Forgot Password', route: '/auth/forgot-password'},
            {label: 'New Password', route: '/auth/new-password'},
            {label: 'Two Steps', route: '/auth/two-steps'},
          ],
        },


      ],
    },
    {
      group: 'Catalogue',
      items: [
        {
          icon: 'assets/icons/heroicons/outline/bookmark.svg',
          label: 'Marketplace',
          route: '/marketplace/marketplace',

        }, {
          icon: 'assets/icons/heroicons/outline/magnifying-glass.svg',
          label: 'Sourcing',
          children: [
            {label: 'Sourcing Create', route: '/sourcing/sourcing/create'},
            {label: 'Sourcing List', route: '/sourcing/sourcing/list'},            // { label: 'Podcast', route: '/dashboard/podcast' },
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/cube.svg',
          label: 'Manage Products',
          children: [
            {
              label: 'Attributes',
              children: [
                {label: 'Attribute List', route: '/attribute/attribute/list'},
                {label: 'Attribute Create', route: '/attribute/attribute/create'},
              ]
            },
            {
              label: 'Options',
              children: [
                {label: 'Option List', route: '/option/option/list'},
                {label: 'Option Create', route: '/option/option/create'},
              ]
            },
            {
              label: 'Categories',
              children: [
                {label: 'Category List', route: '/category/category/list'},
                {label: 'Category Create', route: '/category/category/create'},
              ]
            },
            {
              label: 'Brands',
              children: [
                {label: 'Brand List', route: '/brand/brand/list'},
                {label: 'Brand Create', route: '/brand/brand/create'},
              ]
            },
            {
              label: 'Products',
              children: [
                {label: 'Product List', route: '/product/product/list'},
                {label: 'Product Create', route: '/product/product/create'},
                {label: 'Product favorite', route: '/product/product/favorite'},
                {label: 'Product cart', route: '/product/product/cart'},
              ]
            },

          ],
        },

      ],
    },


    {
      group: 'Third Partie',
      items: [
        {
          icon: 'assets/icons/heroicons/outline/user-circle.svg',
          label: 'Forwarding Agent',
          children: [
            {label: 'Forwarding Agent Create', route: '/forwardingAgent/forwardingAgent/create'},
            {label: 'Forwarding Agent List', route: '/forwardingAgent/forwardingAgent/list'},
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/user-circle.svg',
          label: 'Transporter',
          children: [
            {label: 'Transporter Create', route: '/transporter/transporter/create'},
            {label: 'Transporter List', route: '/transporter/transporter/list'},
          ],
        },
      ],
    },

  ];
}




