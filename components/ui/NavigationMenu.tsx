import * as React from 'react';
import {cn} from '@/lib/utils';

export const NavigationMenu = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({className, ...props}, ref) => <div ref={ref} className={cn('flex items-center', className)} {...props} />
);
NavigationMenu.displayName = 'NavigationMenu';

export const NavigationMenuList = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({className, ...props}, ref) => <ul ref={ref} className={cn('flex items-center', className)} {...props} />
);
NavigationMenuList.displayName = 'NavigationMenuList';

export const NavigationMenuItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({className, ...props}, ref) => <li ref={ref} className={cn('list-none', className)} {...props} />
);
NavigationMenuItem.displayName = 'NavigationMenuItem';
