import SectionHeader from "./SectionHeader";
import {
  Home, Settings, User, Bell, Search, Plus, Edit, Trash2,
  ChevronRight, ChevronDown, ArrowLeft, ArrowRight, Check, X,
  Download, Upload, Eye, EyeOff, Calendar, Clock, Filter,
  MoreHorizontal, ExternalLink, Copy, RefreshCw, LogOut,
} from "lucide-react";

const icons = [
  { name: "Home", icon: Home },
  { name: "Settings", icon: Settings },
  { name: "User", icon: User },
  { name: "Bell", icon: Bell },
  { name: "Search", icon: Search },
  { name: "Plus", icon: Plus },
  { name: "Edit", icon: Edit },
  { name: "Trash2", icon: Trash2 },
  { name: "ChevronRight", icon: ChevronRight },
  { name: "ChevronDown", icon: ChevronDown },
  { name: "ArrowLeft", icon: ArrowLeft },
  { name: "ArrowRight", icon: ArrowRight },
  { name: "Check", icon: Check },
  { name: "X", icon: X },
  { name: "Download", icon: Download },
  { name: "Upload", icon: Upload },
  { name: "Eye", icon: Eye },
  { name: "EyeOff", icon: EyeOff },
  { name: "Calendar", icon: Calendar },
  { name: "Clock", icon: Clock },
  { name: "Filter", icon: Filter },
  { name: "MoreHorizontal", icon: MoreHorizontal },
  { name: "ExternalLink", icon: ExternalLink },
  { name: "Copy", icon: Copy },
  { name: "RefreshCw", icon: RefreshCw },
  { name: "LogOut", icon: LogOut },
];

const IconsSection = () => (
  <section>
    <SectionHeader title="Ícones" description="Ícones da biblioteca Lucide React. Tamanho padrão: 20px. Cor: currentColor." />
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
        {icons.map(({ name, icon: Icon }) => (
          <div
            key={name}
            className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors cursor-default"
          >
            <Icon className="h-5 w-5 text-foreground" />
            <span className="text-[10px] text-muted-foreground font-mono text-center leading-tight">{name}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Tamanhos</h3>
        <div className="flex items-end gap-6">
          {[16, 20, 24, 32].map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <Settings style={{ width: size, height: size }} className="text-foreground" />
              <span className="text-xs text-muted-foreground font-mono">{size}px</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default IconsSection;
