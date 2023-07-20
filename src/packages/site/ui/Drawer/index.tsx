"use client";

import { PropsWithChildren, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Icon, IconButton } from "@design-system/ui";
import { styled } from "@/lib/stitches.config";
import { Flex } from "../Flex";
import { Header } from "../Header";
import { Header as DrawerHeader } from "./Header";
import { Items } from "./Items";

interface DrawerProps {}

type DrawerState = "closed" | "clicked" | "hovered";

const animationDuration = 250;

const Drawer = ({ children }: PropsWithChildren<DrawerProps>) => {
  const [drawerState, setDrawerState] = useState<DrawerState>("closed");

  const isOpen = drawerState !== "closed";
  const isClicked = drawerState === "clicked";
  const isHovered = drawerState === "hovered";

  const close = () => setDrawerState("closed");

  return (
    <Flex
      onMouseLeave={() => {
        if (isHovered) close();
      }}
    >
      <Dialog.Root open={isOpen}>
        <DialogContent as="aside" size={drawerState}>
          <DrawerHeader
            showCloseButton={isClicked}
            onClose={() => setDrawerState("hovered")}
          />
          <Items />
        </DialogContent>

        <Container>
          <AreaToHovered
            onMouseOver={() => {
              if (!isClicked) setDrawerState("hovered");
            }}
          >
            <Header>
              {!isClicked && (
                <Dialog.Trigger asChild>
                  <IconButton onClick={() => setDrawerState("clicked")}>
                    <Icon
                      size={16}
                      icon={isHovered ? "chevronRight" : "menu"}
                    />
                  </IconButton>
                </Dialog.Trigger>
              )}
            </Header>

            {children}
          </AreaToHovered>
        </Container>
      </Dialog.Root>
    </Flex>
  );
};

const DialogContent = styled(Dialog.Content, {
  transition: `all ${animationDuration}ms ease-in`,
  transform: "translateX(0)",
  top: 60,
  position: "absolute",
  width: 240,
  zIndex: 999,

  "&:focus": {
    outline: "none",
  },

  "&:hover .close-drawer": {
    opacity: 1,
  },

  variants: {
    size: {
      clicked: {
        backgroundColor: "$white100",
        height: "100vh",
        top: 0,
        position: "relative",
      },
      hovered: {
        background: "$white700",
        borderRadius: "$sm",
        boxShadow:
          "rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px",
      },
      closed: {
        width: 0,
        transform: "translateX(-240px)",
      },
    },
  },

  defaultVariants: {
    size: "closed",
  },
});

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  transition: `all ${animationDuration}ms ease-in`,
  width: "100%",
});

const AreaToHovered = styled("div", {
  background: "transparent",
  height: "100vh",
  width: 120,
  position: "absolute",
  zIndex: 1,
});

export { Drawer };
