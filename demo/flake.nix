{
  description = "FPRebalance development environment (Node + TS + Vite)";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.05";
    flake-utils.url = "github:numtide/flake-utils";
    alejandra.url = "github:kamadorueda/alejandra";
  };

  outputs = { self, nixpkgs, flake-utils, alejandra, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [];
        };

        # Node version — safest for Vite/TypeScript
        node = pkgs.nodejs_22;

      in {
        # ----------------------------------------------------------------------------
        # DEV SHELL
        # ----------------------------------------------------------------------------
        devShell = pkgs.mkShell {
          name = "fp-rebalance-devshell";

          buildInputs = [
            node
            pkgs.pnpm
            pkgs.typescript
            pkgs.esbuild
            pkgs.openssl      # some npm packages require this
          ];

          shellHook = ''
            echo "🟢 FPRebalance development shell loaded"
            echo "node: $(node -v)"
            echo "pnpm: $(pnpm -v)"
          '';
        };

        # ----------------------------------------------------------------------------
        # FORMATTER (alejandra)
        # ----------------------------------------------------------------------------
        formatter = alejandra.packages.${system}.default;

        # ----------------------------------------------------------------------------
        # CHECKS
        # flake check runs: nix build .#checks.${system}.build
        # ----------------------------------------------------------------------------
        checks = {
          build = pkgs.stdenv.mkDerivation {
            name = "fp-rebalance-build-check";

            # Your project source
            src = self;

            nativeBuildInputs = [
              node
              pkgs.pnpm
            ];

            # Ensure pnpm can run in sandbox
            NPM_CONFIG_PREFIX = "${pkgs.buildPackages.coreutils}/bin";

            buildPhase = ''
              pnpm install --frozen-lockfile
              pnpm run build
            '';

            installPhase = ''
              mkdir -p $out
              cp -r dist/* $out/
            '';
          };
        };
      });
}
