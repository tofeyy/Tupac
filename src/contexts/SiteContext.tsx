
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface MenuItem {
  id: string;
  name: string;
  type: 'tiktok' | 'instagram' | 'twitter' | 'pinterest' | 'tutorials' | 'websites' | 'apps';
  apiUrl?: string;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  youtubeUrl: string;
}

export interface Website {
  id: string;
  name: string;
  description: string;
  url: string;
  image: string;
}

export interface App {
  id: string;
  name: string;
  description: string;
  downloadUrl: string;
  icon: string;
}

interface SiteContextType {
  menuItems: MenuItem[];
  tutorials: Tutorial[];
  websites: Website[];
  apps: App[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  addTutorial: (tutorial: Omit<Tutorial, 'id'>) => void;
  addWebsite: (website: Omit<Website, 'id'>) => void;
  addApp: (app: Omit<App, 'id'>) => void;
  updateMenuItem: (id: string, item: Omit<MenuItem, 'id'>) => void;
  updateTutorial: (id: string, tutorial: Omit<Tutorial, 'id'>) => void;
  updateWebsite: (id: string, website: Omit<Website, 'id'>) => void;
  updateApp: (id: string, app: Omit<App, 'id'>) => void;
  deleteMenuItem: (id: string) => void;
  deleteTutorial: (id: string) => void;
  deleteWebsite: (id: string) => void;
  deleteApp: (id: string) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const useSite = () => {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: '1', name: 'تحميل من تيك توك', type: 'tiktok', apiUrl: 'https://tofey.serv00.net/tiktok?url=' },
    { id: '2', name: 'حولي', type: 'tutorials' }
  ]);
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [apps, setApps] = useState<App[]>([]);

  useEffect(() => {
    const savedMenuItems = localStorage.getItem('tupac_menu_items');
    const savedTutorials = localStorage.getItem('tupac_tutorials');
    const savedWebsites = localStorage.getItem('tupac_websites');
    const savedApps = localStorage.getItem('tupac_apps');

    if (savedMenuItems) setMenuItems(JSON.parse(savedMenuItems));
    if (savedTutorials) setTutorials(JSON.parse(savedTutorials));
    if (savedWebsites) setWebsites(JSON.parse(savedWebsites));
    if (savedApps) setApps(JSON.parse(savedApps));
  }, []);

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() };
    const updatedItems = [...menuItems, newItem];
    setMenuItems(updatedItems);
    localStorage.setItem('tupac_menu_items', JSON.stringify(updatedItems));
  };

  const addTutorial = (tutorial: Omit<Tutorial, 'id'>) => {
    const newTutorial = { ...tutorial, id: Date.now().toString() };
    const updatedTutorials = [...tutorials, newTutorial];
    setTutorials(updatedTutorials);
    localStorage.setItem('tupac_tutorials', JSON.stringify(updatedTutorials));
  };

  const addWebsite = (website: Omit<Website, 'id'>) => {
    const newWebsite = { ...website, id: Date.now().toString() };
    const updatedWebsites = [...websites, newWebsite];
    setWebsites(updatedWebsites);
    localStorage.setItem('tupac_websites', JSON.stringify(updatedWebsites));
  };

  const addApp = (app: Omit<App, 'id'>) => {
    const newApp = { ...app, id: Date.now().toString() };
    const updatedApps = [...apps, newApp];
    setApps(updatedApps);
    localStorage.setItem('tupac_apps', JSON.stringify(updatedApps));
  };

  const updateMenuItem = (id: string, item: Omit<MenuItem, 'id'>) => {
    const updatedItems = menuItems.map(menuItem => 
      menuItem.id === id ? { ...item, id } : menuItem
    );
    setMenuItems(updatedItems);
    localStorage.setItem('tupac_menu_items', JSON.stringify(updatedItems));
  };

  const updateTutorial = (id: string, tutorial: Omit<Tutorial, 'id'>) => {
    const updatedTutorials = tutorials.map(tut => 
      tut.id === id ? { ...tutorial, id } : tut
    );
    setTutorials(updatedTutorials);
    localStorage.setItem('tupac_tutorials', JSON.stringify(updatedTutorials));
  };

  const updateWebsite = (id: string, website: Omit<Website, 'id'>) => {
    const updatedWebsites = websites.map(site => 
      site.id === id ? { ...website, id } : site
    );
    setWebsites(updatedWebsites);
    localStorage.setItem('tupac_websites', JSON.stringify(updatedWebsites));
  };

  const updateApp = (id: string, app: Omit<App, 'id'>) => {
    const updatedApps = apps.map(application => 
      application.id === id ? { ...app, id } : application
    );
    setApps(updatedApps);
    localStorage.setItem('tupac_apps', JSON.stringify(updatedApps));
  };

  const deleteMenuItem = (id: string) => {
    const updatedItems = menuItems.filter(item => item.id !== id);
    setMenuItems(updatedItems);
    localStorage.setItem('tupac_menu_items', JSON.stringify(updatedItems));
  };

  const deleteTutorial = (id: string) => {
    const updatedTutorials = tutorials.filter(tutorial => tutorial.id !== id);
    setTutorials(updatedTutorials);
    localStorage.setItem('tupac_tutorials', JSON.stringify(updatedTutorials));
  };

  const deleteWebsite = (id: string) => {
    const updatedWebsites = websites.filter(website => website.id !== id);
    setWebsites(updatedWebsites);
    localStorage.setItem('tupac_websites', JSON.stringify(updatedWebsites));
  };

  const deleteApp = (id: string) => {
    const updatedApps = apps.filter(app => app.id !== id);
    setApps(updatedApps);
    localStorage.setItem('tupac_apps', JSON.stringify(updatedApps));
  };

  const value = {
    menuItems,
    tutorials,
    websites,
    apps,
    addMenuItem,
    addTutorial,
    addWebsite,
    addApp,
    updateMenuItem,
    updateTutorial,
    updateWebsite,
    updateApp,
    deleteMenuItem,
    deleteTutorial,
    deleteWebsite,
    deleteApp,
  };

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
};
