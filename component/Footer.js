import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Footer, Body, Title, Content } from "native-base";

const Layout = memo((props) => {
  const { children } = props;

  return (
    <Container>
      <Footer>
        <View style={styles.container}>
          <Content style={styles.content}>
              {children}
          </Content>
      </View>
      </Footer>
    </Container>
  );
});

export default Footer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: 350,
  },
});